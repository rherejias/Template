using GatePass.Models;
using GatePass.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace GatePass.Controllers
{
    public class AccountController : Controller
    {
        private UserModels userModel = new UserModels();

        private Dictionary<string, object> response = new Dictionary<string, object>();
        private Dictionary<string, object> r = new Dictionary<string, object>();

        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            if (returnUrl == "/" || returnUrl == "")
            {
                returnUrl =
                    ConfigurationManager.AppSettings[
                        ConfigurationManager.AppSettings["env"].ToString() + "_base_url"].ToString();
            }
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [ValidateInput(false)]
        [AllowAnonymous]
        [HttpPost]
        public JsonResult Attempt(string username, string password, string returnurl)
        {
            try
            {
                string userType = "";
                if (ModelState.IsValid)
                {
                    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ api login
                    Library.EncryptDecrypt.EncryptDecryptPassword e = new Library.EncryptDecrypt.EncryptDecryptPassword();

                    HttpClientHandler hndlr = new HttpClientHandler();
                    hndlr.UseDefaultCredentials = true;

                    HttpClient client = new HttpClient(hndlr);
                    //client.BaseAddress = new Uri("http://localhost:52889/");
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                    var url = ConfigurationManager.AppSettings[ConfigurationManager.AppSettings["env"].ToString() + "_api_base_url"].ToString() + "login/Authenticate?username=" + username + "&password=" + Server.UrlEncode(e.EncryptPassword(password)) + "&json=true";
                    HttpResponseMessage res = client.GetAsync(url).Result;

                    if (res.IsSuccessStatusCode)
                    {
                        string strJson = res.Content.ReadAsStringAsync().Result;
                        dynamic jObj = (JObject)JsonConvert.DeserializeObject(strJson);

                        JavaScriptSerializer j = new JavaScriptSerializer();
                        object a = j.Deserialize(strJson, typeof(object));

                        var dict = JsonConvert.DeserializeObject<Dictionary<string, object>>(strJson);

                        //response.Add("message", dict["message"]);
                        //response.Add("message", ConfigurationManager.AppSettings[ConfigurationManager.AppSettings["env"].ToString() + "_base_url"].ToString() + returnUrl);

                        //url for getting user info from AD
                        url = ConfigurationManager.AppSettings[ConfigurationManager.AppSettings["env"].ToString() + "_api_base_url"].ToString() + "login/userinfo?username=" + username + "&json=true";
                        res = client.GetAsync(url).Result;
                        if (res.IsSuccessStatusCode)
                        {
                            strJson = res.Content.ReadAsStringAsync().Result;
                            jObj = (JObject)JsonConvert.DeserializeObject(strJson);
                            a = j.Deserialize(strJson, typeof(object));
                            dict = JsonConvert.DeserializeObject<Dictionary<string, object>>(strJson);

                            ADUserObject userObject = new ADUserObject();
                            userObject.Username = dict["sAMAccountName"].ToString();
                            userObject.LastName = dict["sn"].ToString();
                            userObject.GivenName = dict["givenName"].ToString();
                            userObject.EmployeeNbr = dict["employeeNumber"].ToString();
                            userObject.Email = dict["mail"].ToString();
                            userObject.IsActive = true;
                            userObject.Department = dict["department"].ToString();
                            userObject.AddedBy = 0;
                            userObject.DateAdded = DateTime.Now;
                            userObject.Source = "AD";
                            userObject.ThumbnailPhoto = dict["thumbnailPhoto"].ToString();

                            int IsInLocal = userModel.CheckIdFromLocal(dict["mail"].ToString());
                            //int IsInLocal = 0;
                            if (IsInLocal <= 0)
                            {
                                userObject.Type = "user";
                                IsInLocal = userModel.AddUser(userObject);
                                userType = userModel.GetUserType(IsInLocal);
                            }
                            else
                            {
                                userType = userModel.GetUserType(IsInLocal);

                                userObject.Id = IsInLocal;
                                userObject.Type = userType;

                                IsInLocal = userModel.UpdateUser(userObject);
                            }



                            HttpContext.Session.Add("loggedIn", true);
                            HttpContext.Session.Add("userId_local", IsInLocal);
                            HttpContext.Session.Add("user_type", userType);
                            HttpContext.Session.Add("cn", dict["cn"]);
                            HttpContext.Session.Add("title", dict["title"]);
                            HttpContext.Session.Add("department", dict["department"]);
                            HttpContext.Session.Add("company", dict["company"]);
                            HttpContext.Session.Add("employeeNumber", dict["employeeNumber"]);
                            HttpContext.Session.Add("mail", dict["mail"]);
                            HttpContext.Session.Add("thumbnailPhoto", dict["thumbnailPhoto"]);
                        }

                        r.Add("success", true);
                        r.Add("error", false);

                    }
                    else
                    {
                        throw new Exception(res.IsSuccessStatusCode.ToString());
                        //response.Add("message", "An error occured! Please check the api endpoint for <login/Authenticate>.");
                    }
                    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ api login
                    var ac = r["success"];
                    if (ac.ToString() == "True")
                    {
                        //Session["loggedIn"] = "True";
                        //Session.Add("loggedIn", true);
                        HttpContext.Session.Add("loggedIn", true);

                        FormsAuthentication.SetAuthCookie(username, true);
                        //return Redirect(returnUrl);
                        if (returnurl == "" || returnurl == null || returnurl == "/")
                        {
                            response.Add("message", ConfigurationManager.AppSettings[ConfigurationManager.AppSettings["env"].ToString() + "_base_url"].ToString());
                        }
                        else
                        {
                            response.Add("message", returnurl);
                        }

                        response.Add("success", true);
                        response.Add("error", false);

                    }
                    else
                    {
                        throw new Exception("Login failed!");
                    }
                }
                else
                {
                    throw new Exception("Login failed!");
                }
            }
            catch (Exception e)
            {
                response.Add("success", false);
                response.Add("error", true);
                response.Add("message", e.ToString());
            }


            return Json(response, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Logout()
        {
            Session.Remove("userId_local");
            Session.Remove("cn");
            Session.Remove("title");
            Session.Remove("department");
            Session.Remove("company");
            Session.Remove("employeeNumber");
            Session.Remove("mail");
            Session.Remove("thumbnailPhoto");
            Session.Remove("loggedIn");

            response.Add("success", true);
            response.Add("error", false);
            response.Add("message", "");

            return Json(response, JsonRequestBehavior.AllowGet);
        }
    }
}
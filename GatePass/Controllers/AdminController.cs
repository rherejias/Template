using GatePass.Helpers;
using System;
using System.Web.Mvc;

namespace GatePass.Controllers
{
    public class AdminController : Controller
    {
        private CustomHelper custom_helper = new CustomHelper();
        // GET: Admin
        public ActionResult ManageAccessRights()
        {
            ViewBag.Menu = custom_helper.PrepareMenu(5, 4, Session["user_type"].ToString(), Int32.Parse(Session["userId_local"].ToString()));
            ViewBag.Title = "Manage Access Rights";
            ViewBag.PageHeader = "Manage Access Rights";
            ViewBag.Breadcrumbs = "Admin / Manage Access Rights";
            return View();
        }
    }
}
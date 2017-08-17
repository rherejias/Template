using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using GatePass.Helpers;

namespace GatePass.Controllers
{
    public class HomeController : Controller
    {
        private CustomHelper custom_helper = new CustomHelper();
        private Dictionary<string, object> response = new Dictionary<string, object>();

        [CustomAuthorize]
        public ActionResult Index()
        {
            ViewBag.Menu = custom_helper.PrepareMenu(1, 0, Session["user_type"].ToString(), Int32.Parse(Session["userId_local"].ToString()));
            ViewBag.Title = "Dashboard";
            ViewBag.PageHeader = "Dashboard";
            ViewBag.Breadcrumbs = "Home / Dashboard";
            return View();
        }

        public JsonResult Foo()
        {
            try
            {
                response.Add("success", true);
                response.Add("error", false);
                response.Add("message", BuildChart());
            }
            catch (Exception e)
            {
                response.Add("success", false);
                response.Add("error", true);
                response.Add("message", e.ToString());
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }

        /*
         * @author      :   AC <aabasolo@ALLEGROMICRO.com>
         * @date        :   NOV. 28 2016 12:39 PM
         * @description :   prepare chart config for building the chart
         * @parameters  :
         *                  
         * @return      :   string object
         */
        #region BuildChart
        public string BuildChart()
        {
            Dictionary<string, object> chart_params = new Dictionary<string, object>();
            Dictionary<string, object> chartSeries = new Dictionary<string, object>();
            Dictionary<string, object> dataLabels = new Dictionary<string, object>();

            string x = "";
            string categories_str = "GP001,GP002,GP003,GP004,GP005";
            String[] categories_arr = categories_str.Split(',');

            //chartSeries_data.Add("type", "line");
            //chartSeries_data.Add("name", "Goals");
            //chartSeries_data.Add("data", goals_arr);

            //chartSeries_name.Add("type", "column");
            chartSeries.Add("name", "[employee_name]");
            chartSeries.Add("data", new[] {5,7,-3,2,-5});

            dataLabels.Add("enabled", true);
            dataLabels.Add("format", "{point.y:.1f}%");

            chart_params.Add("legend", new Dictionary<string, object>() { { "enabled", false } });
            chart_params.Add("chart", new Dictionary<string, string>() { { "type", "column" } });
            chart_params.Add("title", new Dictionary<string, string>() { { "text", string.Empty } });
            chart_params.Add("xAxis", new Dictionary<string, object>() { { "categories", categories_arr } });
            //chart_params.Add("yAxis", new Dictionary<string, object>() { { "title", new Dictionary<string, string>() { { "text", "Units" } } } });
            chart_params.Add("series", new[] { chartSeries });

            //chart_params.Add("plotOptions", new Dictionary<string, object>()
            //    {
            //        { "series", new Dictionary<string, object>()
            //            {
            //                { "dataLabels", dataLabels }
            //            }
            //        }
            //    }
            //);

            x = custom_helper.BuildChart(chart_params, "chartid");

            return x;
        }
        #endregion

        /*
         * @author      :   AC <aabasolo@ALLEGROMICRO.com>
         * @date        :   NOV. 28 2016 4:21 PM
         * @description :   get statistics
         * @parameters  :
         *                  
         * @return      :   JSON object
         */
        #region GetStatistics
        public JsonResult GetStatistics()
        {
            try
            {
                response.Add("success", true);
                response.Add("error", false);
                response.Add("message", BuildChart());
            }
            catch (Exception e)
            {
                response.Add("success", false);
                response.Add("error", true);
                response.Add("message", e.ToString());
            }

            return Json(response, JsonRequestBehavior.AllowGet);
        }
        #endregion
    }
}
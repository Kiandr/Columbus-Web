using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sage.CA.SBS.ERP.Sage300.Common.Web;
using NND.CA.DV.Models;

namespace NND.CA.Web.Controllers
{
    public class HomeController<T> : BaseController <DVModel> where T : DVModel, new()
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
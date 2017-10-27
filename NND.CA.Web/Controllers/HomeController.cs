using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Sage.CA.SBS.ERP.Sage300.Common.Web;
using NND.CA.DV.Models;
using NND.CA.Common.Web.Menu;
using NND.CA.Common.Model;
using NND.CA.Common.Model.Enums;

namespace NND.CA.Web.Controllers
{
    public class HomeController<T> : BaseController <DVModel> where T : DVModel, new()
    {
        public ActionResult Index()
        {

            List<SystemUser> user = new List<SystemUser>() {  };

            user.Add(new SystemUser(SecurityType.Admin, UserAuthenticationMethod.FaceBook));
            user.Add(new SystemUser(SecurityType.Admin, UserAuthenticationMethod.FaceBook));

            ViewData[ "userObject"] = user;
            return View(user);
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
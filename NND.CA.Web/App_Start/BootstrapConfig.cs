using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using Sage.CA.SBS.ERP.Sage300.Common.Interfaces.Bootstrap;
using System.IO;
using Sage.CA.SBS.ERP.Sage300.Common.Utilities;

namespace NND.CA.Web
{
    class BootstrapConfig
    {
        public static void Register()
        {
            var pathBin = HttpContext.Current.Server.MapPath("~/bin");
            var bootStrapperFile = Path.Combine(HttpContext.Current.Server.MapPath("~"), "bootstrapper.xml");

            BootstrapTaskManager.SetupWeb(pathBin, BootstrapTaskManager.GetSearchPattern(bootStrapperFile).ToArray());
            DependencyResolver.SetResolver(new UnityDependencyResolver(BootstrapTaskManager.Container));
            var container = BootstrapTaskManager.Container;
            ControllerBuilder.Current.SetControllerFactory(new ControllerFactory(container));
        }
    }
}

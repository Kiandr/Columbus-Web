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
using Sage.CA.SBS.ERP.Sage300.Common.Interfaces.App_Start;

namespace NND.CA.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Register areas and routes
            AreaRegistration.RegisterAllAreas();

            // Register global filters
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            RouteConfig.RegisterRoutes(RouteTable.Routes);

            // Register scripts and css bundless
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            // Register unity configuration
            BootstrapConfig.Register();

            // Register our custom controller factory
            //var pathBin = HttpContext.Current.Server.MapPath("~/bin");
            //var bootStrapperFile = Path.Combine(HttpContext.Current.Server.MapPath("~"), "bootstrapper.xml");
            //BootstrapTaskManager.SetupWeb(pathBin, BootstrapTaskManager.GetSearchPattern(bootStrapperFile).ToArray());
            //DependencyResolver.SetResolver(new UnityDependencyResolver(BootstrapTaskManager.Container));
            //var container = BootstrapTaskManager.Container;
            //ControllerBuilder.Current.SetControllerFactory(new ControllerFactory(container));
            //ControllerBuilder.Current.SetControllerFactory(typeof(ControllerFactory));




        }
    }
}

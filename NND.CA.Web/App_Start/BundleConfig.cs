using System.Web;
using System.Web.Optimization;

namespace NND.CA.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            # region JS MainWebProject

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            #endregion

            #region CSS MainWebProject
            // This is the css for the main project
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/DefaultMvc/bootstrap.css",
                      "~/Content/DefaultMvc/site.css"));
            #endregion

            #region Framework KendoUI Js
            bundles.Add(new ScriptBundle("~/bundles/kendo").Include("~/Scripts/Kendo/kendo.all.min.js"));
            #endregion


        }
    }
}

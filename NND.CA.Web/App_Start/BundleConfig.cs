#region Libraries
using System.Web;
using System.Web.Optimization;
#endregion
/// <summary>
/// Configuration for Bundles and Css, and Js
/// </summary>
namespace NND.CA.Web
{
    /// <summary>
    /// Add all you main frameworks in this location. This is being used for main project. Rest of projects are being IoCed using MS Unity framework. 
    /// </summary>
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            #region JS 
            #region JS MainWebProject

            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/DefaultMvc/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/DefaultMvc/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/DefaultMvc/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/DefaultMvc/bootstrap.js",
                      "~/Scripts/DefaultMvc/respond.js"));
            #endregion
            #region Jquery
            bundles.Add(new ScriptBundle("~/bundles/jQuery").Include(
                    "~/Scripts/DefaultMvc/bootstrap.js",
                    "~/Scripts/DefaultMvc/respond.js"));

            #endregion
            #region Framework KendoUI Js Sage
            bundles.Add(new ScriptBundle("~/bundles/kendo/kendoSage").Include(
               // Add jQuery prior KendoUI 
               "~/Scripts/DefaultMvc/jquery-{version}.js",
                "~/Scripts/Kendo/kendo.all.min.js",
                "~/Scripts/Kendo/kendo.culture.en.min.js",
                //"~/Scripts/Kendo/knockout-kendo.js",
                "~/Scripts/Kendo/kendo.custom.min.js"
                // "~/Scripts/Kendo/knockout-kendo.js"
                // "~/Scripts/Kendo/knockout-kendo.js"

                ));
            #endregion
            #region FrameWork Js Telerik DEMO-TRIAL License
            bundles.Add(new ScriptBundle("~/bundles/kendoTrialDemo").Include(
              // Add jQuery prior KendoUI 
              "~/Scripts/DefaultMvc/jquery-{version}.js",
              // Add Chroma Lib, used for Kendo UI
              "~/Scripts/Chroma/chroma.min.js",
              // KendoUI All
              "~/Scripts/KendoTrialScripts/kendo.all.min.js",
             // KnockOut MVVM binder
             "~/Scripts/knockout/knockout_341.js"
              ));

            #endregion
            #region Google FireBase SDK
            bundles.Add(new ScriptBundle("~/bundles/googleFireBase").Include(
              // This requires latest Jquery Library
              "~/Scripts/Google/jquery-3.2.1.min.js",
              "~/Scripts/Google/firebase-app.js",
              "~/Scripts/Google/firebase-auth.js",
              "~/Scripts/Google/firebase-database.js",
              "~/Scripts/Google/firebase-firestore.js",

            //  "~/Scripts/Google/firebase.js",
              "~/Scripts/Google/AuthenticateFireBase.js"
                        //    "~/Scripts/Google/firebase-messaging.js"
            //  "~/Scripts/Google/loader.js"


              ));

            #endregion
            #endregion
            #region CSS

            #region CSS MainWebProject
            // This is the css for the main project
            bundles.Add(new StyleBundle("~/Content/css").Include(
            "~/Content/DefaultMvc/bootstrap.min.css",
            "~/Content/DefaultMvc/site.css"));
            #endregion



            #region FrameWork KendoUI Css
            bundles.Add(new StyleBundle("~/Content/kendo/cssSage").Include(
            "~/Content/Styles/Kendo/kendo.common.less",
            "~/Content/Styles/Kendo/kendo.common.min.css",
            "~/Content/Styles/Kendo/kendo.default.less",
            "~/Content/Styles/Kendo/kendo.default.ming.css"));
            #endregion
			
			#region FrameWork KendoUI Css
            bundles.Add(new StyleBundle("~/Content/kendo/cssKendo").Include(
            "~/Content/Styles/Kendo/kendo.common.min.css",
            "~/Content/Styles/Kendo/kendo.default.min.css"



            // "~/Content/Styles/Kendo/kendo.default.less",
            // "~/Content/Styles/Kendo/kendo.default.ming.css"
            ));
            #endregion

            #endregion
        }
    }
}




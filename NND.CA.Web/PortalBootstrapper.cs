using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.Unity;
using System.Web.Mvc;
using Sage.CA.SBS.ERP.Sage300.Common.Interfaces.Bootstrap;
using Sage.CA.SBS.ERP.Sage300.Common.Utilities;
using NND.CA.DV.Models;
using NND.CA.Web.Controllers;
using System.ComponentModel.Composition;

namespace NND.CA.Web
{
    public class PortalBootstrapper
    {

        /// <summary>Class for Bootstrapper methodsRegister types with the Main Bootstrapper container
        /// </summary>
        [Export(typeof(IBootstrapperTask))]
        [BootstrapMetadataExport("Home",
            new[] { BootstrapAppliesTo.Web, BootstrapAppliesTo.Worker, BootstrapAppliesTo.WebApi }, 11)]
        public class PortalBootStrapper : IBootstrapperTask
        {
            /// <summary>
            /// Register types with the Main Bootstrapper container
            /// </summary>
            /// <param name="container"></param>
            public void Execute(IUnityContainer container)
            {
                RegisterController(container);
                RegisterService(container);
                RegisterRepository(container);
            }



            /// <summary>
            /// Register Controller
            /// </summary>
            /// <param name="container"></param>
            private void RegisterController(IUnityContainer container)
            {
                UnityUtil.RegisterType<IController, HomeController<DVModel>>(container, "Home");
                //UnityUtil.RegisterType<IController, HomeController<NavigableMenu>>(container, "Navigation");
                //UnityUtil.RegisterType<IController, HelpController<MenuHelp>>(container, "Help");
                //UnityUtil.RegisterType<IController, UnsupportedBrowserController>(container, "UnsupportedBrowser");
            }

            /// <summary>
            /// Register Service
            /// </summary>
            /// <param name="container"></param>
            private void RegisterService(IUnityContainer container)
            {

                //UnityUtil.RegisterType<INavigationService<NavigableMenu>, NavigationEntityService<NavigableMenu>>(container);
                //UnityUtil.RegisterType<IHelpService<MenuHelp>, HelpEntityService<MenuHelp>>(container);
                //UnityUtil.RegisterType<IMenuSecurityService, MenuSecurityEntityService>(container);

            }

            /// <summary>
            ///Registers Repository
            /// </summary>
            /// <param name="container"></param>
            private void RegisterRepository(IUnityContainer container)
            {
                //UnityUtil.RegisterType(container, typeof(INavigationEntity<NavigableMenu>), typeof(NavigationRepository<NavigableMenu>));
                //UnityUtil.RegisterType(container, typeof(IHelpEntity<MenuHelp>), typeof(HelpRepository<MenuHelp>));
                //UnityUtil.RegisterType(container, typeof(IMenuSecurityEntity), typeof(MenuSecurityRespository), UnityInjectionType.Default, new InjectionConstructor(typeof(Context)));
            }
        }
    }
}
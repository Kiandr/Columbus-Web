/* Copyright (c) 2014 Kian D.Rad Software, Inc.  All rights reserved. */

#region
using System.Web.Mvc;
using System.Web.Routing;
using Microsoft.Practices.Unity;
#endregion

namespace Sage.CA.SBS.ERP.Sage300.Web
{
    /// <summary>
    /// Class ControllerFactory.
    /// </summary>
    public class ControllerFactory : DefaultControllerFactory
    {
        /// <summary>
        /// The _container
        /// </summary>
        private readonly  IUnityContainer _container;

        /// <summary>
        /// Initializes a new instance of the <see cref="ControllerFactory" /> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public ControllerFactory(IUnityContainer container)
        {
            _container = container;
        }

        /// <summary>
        /// Create Controller
        /// </summary>
        /// <param name="requestContext">Request Context</param>
        /// <param name="controllerName">Controller Name</param>
        /// <returns>IController</returns>
        public override IController CreateController(RequestContext requestContext, string controllerName)
        {
            IController controller;

            // If there are same screen names in multiple modules, then we resolve the controller by prefixing the area name.
            if (requestContext.RouteData != null)
            {
                var area = requestContext.RouteData.DataTokens["Area"] as string;
                if (!string.IsNullOrEmpty(area))
                {
                    controller = GetController(area + controllerName);
                    if (controller != null)
                    {
                        return controller;
                    }
                }
            }

            controller = GetController(controllerName);
            if (controller != null)
            {
                return controller;
            }
            return base.CreateController(requestContext, controllerName);
        }

        /// <summary>
        /// Get controller
        /// </summary>
        /// <param name="controllerName">controllerName</param>
        /// <returns></returns>
        private IController GetController(string controllerName)
        {
            if (_container.IsRegistered<IController>(controllerName))
            {
                return _container.Resolve<IController>(controllerName);
            }
            return null;
        }

    }
}
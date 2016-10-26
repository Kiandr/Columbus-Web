using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Practices.Unity;

namespace NND.CA.Web
{
    public class UnityUtil
    {

        /// <summary>
        /// Register type if not already registered
        /// </summary>
        /// <typeparam name="TFrom">TFrom</typeparam>
        /// <typeparam name="TTo">TTo</typeparam>
        /// <param name="container">IUnityContainer</param>
        public static void RegisterType<TFrom, TTo>(IUnityContainer container) where TTo : TFrom
        {
            container.RegisterType<TFrom, TTo>();
        }
    }
}
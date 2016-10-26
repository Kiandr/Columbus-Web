/* Copyright (c) 1994-2014 Sage Software, Inc.  All rights reserved. */

using Microsoft.Practices.Unity;

namespace NND.CA.Web.Bootstrap
{
    /// <summary>
    /// Bootstrapper task for resolving dependency injections and other startup activities
    /// </summary>
    public interface IBootstrapperTask
    {
        /// <summary>
        /// Bootstrap activity execution
        /// </summary>
        /// <param name="container">The Unity container</param>
        void Execute(IUnityContainer container);
    }
}

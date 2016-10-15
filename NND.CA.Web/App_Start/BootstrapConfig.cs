/* Copyright (c) 1994-2014 Sage Software, Inc.  All rights reserved. */

#region
using System.Web;
using System.Web.Mvc;
#endregion

namespace NND.CA.Web
{
    /// <summary>
    /// Class for configuring Unity bootstrappers.
    /// </summary>
    public class BootstrapConfig
    {
        /// <summary>
        /// Registers the global filters.
        /// </summary>
        public static void Register()
        {
            var pathBin = HttpContext.Current.Server.MapPath("~/bin");
            var pathWeb = HttpContext.Current.Server.MapPath("~");

        }

    }
}
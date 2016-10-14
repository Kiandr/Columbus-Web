using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NND.CA.Web.Startup))]
namespace NND.CA.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

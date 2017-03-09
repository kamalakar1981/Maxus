using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Maxis.Startup))]
namespace Maxis
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

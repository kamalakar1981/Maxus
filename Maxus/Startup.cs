using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Maxus.Startup))]
namespace Maxus
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}

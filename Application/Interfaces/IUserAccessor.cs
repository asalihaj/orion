using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUserAccessor
    {
         string GetCurrentUsername();
         dynamic GetProfile(string Id);
    }
}
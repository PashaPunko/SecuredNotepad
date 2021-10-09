using Microsoft.AspNetCore.Mvc;
using SecuredNotepad.Services;

namespace SecuredNotepad.Controllers
{
    [Route("api/security")]
    [ApiController]
    public class SecurityController : ControllerBase
    {
        private readonly ISecurityService securityService;

        public SecurityController(ISecurityService securityService)
        {
            this.securityService = securityService;
        }


        [HttpGet]
        [Route(nameof(GetSessionKey))]
        public JsonResult GetSessionKey(string publicKey)
        {
            return new JsonResult(securityService.GetEncodedSessionKey(publicKey));
        }

        [HttpGet]
        [Route(nameof(GetDocuments))]
        public JsonResult GetDocuments(string publicKey, string file)
        {
            return new JsonResult(securityService.GetEncryptedDocuments(publicKey, file));
        }
    }
}

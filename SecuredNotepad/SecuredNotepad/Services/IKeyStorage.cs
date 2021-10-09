using SecuredNotepad.Models;

namespace SecuredNotepad.Services
{
    public interface IKeyStorage
    {
        SessionKeyViewModel GetSessionKey(string publicKey);
        void AddSessionKey(string publicKey, SessionKeyViewModel sessionKey);
    }
}
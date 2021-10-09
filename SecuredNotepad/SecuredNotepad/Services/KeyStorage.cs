using System.Collections.Concurrent;
using SecuredNotepad.Models;

namespace SecuredNotepad.Services
{
    public class KeyStorage : IKeyStorage
    {

        private ConcurrentDictionary<string, SessionKeyViewModel> keyStorage;

        public KeyStorage()
        {
            keyStorage = new ConcurrentDictionary<string, SessionKeyViewModel>();
        }

        public SessionKeyViewModel GetSessionKey(string publicKey)
        {
            return keyStorage[publicKey];
        }

        public void AddSessionKey(string publicKey, SessionKeyViewModel sessionKey)
        {
            keyStorage[publicKey] = sessionKey;
        }
    }
}
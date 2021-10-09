using SecuredNotepad.Models;

namespace SecuredNotepad.Services
{
    public interface ISecurityService
    {
        SessionKeyViewModel GetEncodedSessionKey(string pemPublicKey);
        byte[] GetEncryptedDocuments(string publicKey, string file);
    }
}

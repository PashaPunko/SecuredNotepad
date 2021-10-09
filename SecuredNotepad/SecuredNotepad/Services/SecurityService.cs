using System;
using System.IO;
using System.Security.Cryptography;
using SecuredNotepad.Models;

namespace SecuredNotepad.Services
{
    public class SecurityService: ISecurityService
    {
        private readonly IKeyStorage keyStorage;
        public SecurityService(IKeyStorage keyStorage)
        {
            this.keyStorage = keyStorage;
        }

        public SessionKeyViewModel GetEncodedSessionKey(string publicKey)
        {
            byte[] der = Convert.FromBase64String(publicKey);
            RSACryptoServiceProvider rsa = new RSACryptoServiceProvider();
            rsa.ImportRSAPublicKey(der, out _);
            Aes aesAlg = Aes.Create();
            aesAlg.GenerateKey();
            aesAlg.GenerateIV();
            var sessionKey = new SessionKeyViewModel
            {
                AesKey = rsa.Encrypt(aesAlg.Key, RSAEncryptionPadding.Pkcs1),
                Iv = rsa.Encrypt(aesAlg.IV, RSAEncryptionPadding.Pkcs1),
            };
            keyStorage.AddSessionKey(publicKey, new SessionKeyViewModel { Iv = aesAlg.IV, AesKey = aesAlg.Key});
            return sessionKey;
        }

        public byte[] GetEncryptedDocuments(string publicKey, string file)
        {
            var sessionKey = keyStorage.GetSessionKey(publicKey);
            string text = File.ReadAllText(
                Path.Combine(Directory.GetCurrentDirectory(), $"Documents/{file}"));
            byte[] encrypted;

            using Aes aesAlg = Aes.Create();
            aesAlg.Key = sessionKey.AesKey;
            aesAlg.IV = sessionKey.Iv;

            ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
            using (MemoryStream msEncrypt = new MemoryStream())
            {
                using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                {
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
                    {
                        swEncrypt.Write(text);
                    }
                    encrypted = msEncrypt.ToArray();
                }
            }

            return encrypted;
        }

    }
}

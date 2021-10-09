namespace SecuredNotepad.Models
{
    public class SessionKeyViewModel
    {
        public byte[] AesKey { get; set; }
        public byte[] Iv { get; set; }
    }
}

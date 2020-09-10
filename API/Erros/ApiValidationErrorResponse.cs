using System.Collections;

namespace API.Erros
{
    public class ApiValidationErrorResponse : ApiResponse
    {
        public ApiValidationErrorResponse() : base(400)
        {
        }
        public IEnumerable Errors { get; set; }
    }
}
namespace Villa_API_Project.DataAccess.Reposatory.IReposatory
{
    public interface IJWT_TokenReposatory
    {
        string GenerateToken(string userId);

    }
}

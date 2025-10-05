using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherNasa.Migrations
{
    /// <inheritdoc />
    public partial class history : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "WeatherDay",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherDay_UserId",
                table: "WeatherDay",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherDay_AspNetUsers_UserId",
                table: "WeatherDay",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherDay_AspNetUsers_UserId",
                table: "WeatherDay");

            migrationBuilder.DropIndex(
                name: "IX_WeatherDay_UserId",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "WeatherDay");
        }
    }
}

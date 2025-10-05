using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherNasa.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "Humidity_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Precipitation_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Sunshine_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "WeatherHistoryId",
                table: "WeatherDay",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Wind_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "temperature_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "WeatherHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeatherHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeatherHistory_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeatherDay_WeatherHistoryId",
                table: "WeatherDay",
                column: "WeatherHistoryId");

            migrationBuilder.CreateIndex(
                name: "IX_WeatherHistory_UserId",
                table: "WeatherHistory",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherDay_WeatherHistory_WeatherHistoryId",
                table: "WeatherDay",
                column: "WeatherHistoryId",
                principalTable: "WeatherHistory",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherDay_WeatherHistory_WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.DropTable(
                name: "WeatherHistory");

            migrationBuilder.DropIndex(
                name: "IX_WeatherDay_WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "Humidity_condition",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "Precipitation_condition",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "Sunshine_condition",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "Wind_condition",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "temperature_condition",
                table: "WeatherDay");

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
    }
}

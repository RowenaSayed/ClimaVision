using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherNasa.Migrations
{
    /// <inheritdoc />
    public partial class uuu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherDay_WeatherHistory_WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.DropIndex(
                name: "IX_WeatherDay_WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "WeatherHistoryId",
                table: "WeatherDay");

            migrationBuilder.AddColumn<int>(
                name: "History_id",
                table: "WeatherDay",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WeatherDay_History_id",
                table: "WeatherDay",
                column: "History_id");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherDay_WeatherHistory_History_id",
                table: "WeatherDay",
                column: "History_id",
                principalTable: "WeatherHistory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WeatherDay_WeatherHistory_History_id",
                table: "WeatherDay");

            migrationBuilder.DropIndex(
                name: "IX_WeatherDay_History_id",
                table: "WeatherDay");

            migrationBuilder.DropColumn(
                name: "History_id",
                table: "WeatherDay");

            migrationBuilder.AddColumn<int>(
                name: "WeatherHistoryId",
                table: "WeatherDay",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WeatherDay_WeatherHistoryId",
                table: "WeatherDay",
                column: "WeatherHistoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_WeatherDay_WeatherHistory_WeatherHistoryId",
                table: "WeatherDay",
                column: "WeatherHistoryId",
                principalTable: "WeatherHistory",
                principalColumn: "Id");
        }
    }
}

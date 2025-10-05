using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WeatherNasa.Migrations
{
    /// <inheritdoc />
    public partial class oo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "Wind_condition",
                table: "WeatherDay");

            migrationBuilder.RenameColumn(
                name: "temperature_condition",
                table: "WeatherDay",
                newName: "Weather_condition");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Weather_condition",
                table: "WeatherDay",
                newName: "temperature_condition");

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

            migrationBuilder.AddColumn<string>(
                name: "Wind_condition",
                table: "WeatherDay",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}

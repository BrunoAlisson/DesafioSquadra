using Microsoft.EntityFrameworkCore.Migrations;
using System;

namespace DesafioSquadra.Migrations
{
    public partial class AddStatusDataAlteracaoJustificativa : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DataUltimaAlteracao",
                table: "Sistema",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "JustificativaUltimaAlteracao",
                table: "Sistema",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Sistema",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DataUltimaAlteracao",
                table: "Sistema");

            migrationBuilder.DropColumn(
                name: "JustificativaUltimaAlteracao",
                table: "Sistema");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sistema");
        }
    }
}

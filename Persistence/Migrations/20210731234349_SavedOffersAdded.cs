using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SavedOffersAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Companies_CompanyId",
                table: "Offers");

            migrationBuilder.AlterColumn<string>(
                name: "CompanyId",
                table: "Offers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "SavedOffers",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    OfferId = table.Column<Guid>(nullable: false),
                    LastUpdated = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SavedOffers", x => new { x.UserId, x.OfferId });
                    table.ForeignKey(
                        name: "FK_SavedOffers_Offers_OfferId",
                        column: x => x.OfferId,
                        principalTable: "Offers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SavedOffers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SavedOffers_OfferId",
                table: "SavedOffers",
                column: "OfferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Companies_CompanyId",
                table: "Offers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Offers_Companies_CompanyId",
                table: "Offers");

            migrationBuilder.DropTable(
                name: "SavedOffers");

            migrationBuilder.AlterColumn<string>(
                name: "CompanyId",
                table: "Offers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Offers_Companies_CompanyId",
                table: "Offers",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

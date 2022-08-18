# Orion Platform
Online Job Offering and Applying platform for companies and jobseekers.
This project was created using **.NET Core 2.2**, **React js** and **PostgreSQL** technologies.

To run this project you need to have:
- [.NET Core 2.2](https://dotnet.microsoft.com/en-us/download/dotnet/2.2)
- [Node js](https://nodejs.org/en/)
- [PostgreSQL 13](https://www.postgresql.org/download/)
- [PgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/)
- [A Dropbox account](https://www.dropbox.com/home)

How to run the project:
- Create an Dropbox App (Watch [video](https://www.youtube.com/watch?v=cj7A-CjL-wI) or read [this guide](https://www.dropbox.com/developers/reference/getting-started#overview))
- Install the code in your device
- Add **appsettings.json** file inside API directory/folder (this file should contain some data as shown below)
```
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost; Port=5432; Database=your_db_here; Username=postgres; Password=your_pg_password"
  },
  "Administrator": {
    "Username": "Administrator",
    "Email": "admin@orion.com",
    "Password": "Pa$$w0rd"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning"
    }
  },
  "Dropbox": {
    "AccessToken": "enter_your_dropbox_access_token_here"
  },
  "AllowedHosts": "*"
}
```
- Install required .NET Core packages by typing **dotnet restore** in your console (in the directory/folder where orion.sln is)
- Install node modules by typing **npm install** in your console (inside client-app folder)
- Start Dotnet Core application by typing **dotnet watch run** in your console (inside API directory/folder)
- Start NPM server by typing **npm start** (inside client-app folder)

Main functionalities of the platform:
- Post job offers
- Apply in published offers
- Save offers
- Download resumes

Remake of [JobPoint](https://github.com/asalihaj/job-point)

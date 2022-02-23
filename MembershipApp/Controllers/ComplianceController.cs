using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using MembershipApp.Models;

namespace MembershipApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplianceController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ComplianceController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select ComplianceId, dbo.Compliance.MemberFullName, dbo.Member.MemberFullName,dbo.Member.MemberId,convert(varchar(10),CurrentDate,120) as CurrentDate, Temperature, Fever, Cough, Chills, Taste, Other, Contact from
                            dbo.Compliance inner join dbo.Member on Compliance.MemberFullName=Member.MemberFullName
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            string query = @"
                            select ComplianceId, MemberFullName, convert(varchar(10),CurrentDate,120) as CurrentDate, Temperature, Fever, Cough, Chills, Taste, Other, Contact from
                            dbo.Compliance where ComplianceId = @ComplianceId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ComplianceId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }


        [HttpPost]
        public JsonResult Post(Compliance comp)
        {
            string query = @"
                            insert into dbo.Compliance
                            (MemberFullName,Temperature,CurrentDate,Fever,Chills,Cough,Taste,Contact,Other)
                            values (@MemberFullName,@Temperature,@CurrentDate,@Fever,@Chills,@Cough,@Taste,@Contact,@Other)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@MemberFullName", comp.MemberFullName);
                    myCommand.Parameters.AddWithValue("@Temperature", comp.Temperature);
                    myCommand.Parameters.AddWithValue("@CurrentDate", comp.CurrentDate);
                    myCommand.Parameters.AddWithValue("@Fever", comp.Fever);
                    myCommand.Parameters.AddWithValue("@Chills", comp.Chills);
                    myCommand.Parameters.AddWithValue("@Cough", comp.Cough);
                    myCommand.Parameters.AddWithValue("@Taste", comp.Taste);
                    myCommand.Parameters.AddWithValue("@Contact", comp.Contact);
                    myCommand.Parameters.AddWithValue("@Other", comp.Other);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }

            }
            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Compliance comp)
        {
            string query = @"
                            update dbo.Compliance
                            set MemberFullName = @MemberFullName,
                                Temperature = @Temperature,
                                CurrentDate = @CurrentDate,
                                Fever = @Fever,
                                Chills = @Chills,
                                Breath = @Breath,
                                Cough = @Cough,
                                Taste = @Taste,
                                Contact = @Contact,
                                Other = @Other
                            where ComplianceId = @ComplianceId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ComplianceId", comp.ComplianceId);
                    myCommand.Parameters.AddWithValue("@MemberFullName", comp.MemberFullName);
                    myCommand.Parameters.AddWithValue("@Temperature", comp.Temperature);
                    myCommand.Parameters.AddWithValue("@CurrentDate", comp.CurrentDate);
                    myCommand.Parameters.AddWithValue("@Fever", comp.Fever);
                    myCommand.Parameters.AddWithValue("@Chills", comp.Chills);
                    myCommand.Parameters.AddWithValue("@Breath", comp.Breath);
                    myCommand.Parameters.AddWithValue("@Cough", comp.Cough);
                    myCommand.Parameters.AddWithValue("@Taste", comp.Taste);
                    myCommand.Parameters.AddWithValue("@Contact", comp.Contact);
                    myCommand.Parameters.AddWithValue("@Other", comp.Other);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                            delete from dbo.Compliance
                            where ComplianceId = @ComplianceId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@ComplianceId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

    }
}

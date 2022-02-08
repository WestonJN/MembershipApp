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
    public class MemberController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public MemberController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select MemberId, MemberFullName,Department, ResidentialAddress, CellNumber,
                            convert(varchar(10),DateOfBirth,120) as DateOfBirth,
                            convert(varchar(10),DateOfBaptism,120) as DateOfBaptism
                            from
                            dbo.Member
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

        [HttpPost]
        public JsonResult Post(Member mem)
        {
            string query = @"
                            insert into dbo.Member
                            (MemberFullName,ResidentialAddress,CellNumber,Department,DateOfBirth,DateOfBaptism)
                            values (@MemberFullName,@ResidentialAddress,@CellNumber,@Department,@DateOfBirth,@DateOfBaptism)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@MemberFullName", mem.MemberFullName);
                    myCommand.Parameters.AddWithValue("@ResidentialAddress", mem.ResidentialAddress);
                    myCommand.Parameters.AddWithValue("@CellNumber", mem.CellNumber);
                    myCommand.Parameters.AddWithValue("@Department", mem.Department);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", mem.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@DateOfBaptism", mem.DateOfBaptism);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        public JsonResult Put(Member mem)
        {
            string query = @"
                            update dbo.Member
                            set MemberFullName = @MemberFullName,
                                Department = @Department,
                                ResidentialAddress = @ResidentialAddress,
                                CellNumber = @CellNumber,
                                DateOfBirth = @DateOfBirth,
                                DateOfBaptism = @DateOfBaptism
                            where MemberId = @MemberId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@MemberId", mem.MemberId);
                    myCommand.Parameters.AddWithValue("@MemberFullName", mem.MemberFullName);
                    myCommand.Parameters.AddWithValue("@Department", mem.Department);
                    myCommand.Parameters.AddWithValue("@ResidentialAddress", mem.ResidentialAddress);
                    myCommand.Parameters.AddWithValue("@CellNumber", mem.CellNumber);
                    myCommand.Parameters.AddWithValue("@DateOfBirth", mem.DateOfBirth);
                    myCommand.Parameters.AddWithValue("@DateOfBaptism", mem.DateOfBaptism);
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
                            delete from dbo.Member
                            where MemberId = @MemberId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("MemberAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@MemberId", id);
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

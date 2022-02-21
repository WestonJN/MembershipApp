const compliance = {
    template: `<div>

        <button type="button"
        class="btn btn-secondary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#memberModal"
        @click="addClick()">
        Add New Member
        </button>

        <table class="table table-striped">
        <thead>
            <tr>
                <th>
                    <div class="d-flex flex-row">
                         <input class="form-control m-2"
                            v-model="MemberFullNameFilter"
                            v-on:keyup="FilterFn()"
                            placeholder="Filter">

                            <button type="button" class="btn btn-light"
                            @click="sortResult('MemberFullName',true)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                            </svg>
                            </button>

                            <button type="button" class="btn btn-light"
                            @click="sortResult('MemberFullName',false)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                            <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                            </svg>
                            </button>
                    </div>
                    Member Fullname
                </th>
                    <th>
                        Residential Address
                    </th> 
                    <th>
                        Cell Number
                    </th>
                    <th>
                        Options
                    </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="mem in members">
                <td>{{mem.MemberFullName}}</td>
                <td>{{mem.ResidentialAddress}}</td>
                <td>{{mem.CellNumber}}</td>
                <td>
                   <button type="button" class="btn btn-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            @click="editClick(mem)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                    <button type="button"
                    class="btn btn-light mr-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </button>

                </td>
            </tr>
        </tbody>
        </table>

        <div class="modal fade" id="exampleModal" tabindex="-1"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                         <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                         aria-label="Close"></button>
                     </div>

    <div class="modal-body">
            <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 w-50 bd-highlight">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Full Name</span>
                            <input type="text" class="form-control" v-model="MemberFullName">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Temperature</span>
                            <input type="text" class="form-control" v-model="Temperature">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Date</span>
                            <input type="date" class="form-control" v-model="Date">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Fever</span>
                            <input type="text" class="form-control" v-model="Fever">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Chills</span>
                            <input type="text" class="form-control" v-model="Chills">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Breath</span>
                            <input type="text" class="form-control" v-model="Breath">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Cough</span>
                            <input type="text" class="form-control" v-model="Cough">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Taste</span>
                            <input type="text" class="form-control" v-model="Taste">
                        </div>
                         <div class="input-group mb-3">
                            <span class="input-group-text">Contact</span>
                            <input type="text" class="form-control" v-model="Contact">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Other</span>
                            <input type="text" class="form-control" v-model="Other">
                        </div>

                    </div>
                </div>
                    <button type="button" 
                    v-if="MemberId==0" class="btn btn-secondary">
                    Create
                    </button>
                    <button type="button"
                    v-if="MemberId!=0" class="btn btn-secondary">
                    Update
                    </button>

                </div>

            </div>
        </div>
    </div>

<div class="modal fade" id="memberModal" tabindex="-1" aria-labelledby="memberModal" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="memberModal">{{modalTitle}}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div class="modal-body">
                <div class="d-flex flex-row bd-highlight mb-3">
                    <div class="p-2 w-50 bd-highlight">
                        <div class="input-group mb-3">
                            <span class="input-group-text">Full Name</span>
                            <input type="text" class="form-control" v-model="MemberFullName">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Cell Number</span>
                            <input type="text" class="form-control" v-model="CellNumber">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Residential Address</span>
                            <input type="text" class="form-control" v-model="ResidentialAddress">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Department</span>
                            <select class="form-select" v-model="Department">
                                <option v-for="dep in departments">
                                    {{dep.DepartmentName}}
                                </option>
                            </select>
                        </div>

                        <div class="input-group mb-3">
                            <span class="input-group-text">DateOfBirth</span>
                            <input type="date" class="form-control" v-model="DateOfBirth">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">DateOfBaptism</span>
                            <input type="date" class="form-control" v-model="DateOfBaptism">
                        </div>

                    </div>
                </div>
                <button type="button" @click="createClick()" v-if="MemberId==0" class="btn btn-secondary">
                    Create
                </button>
                <button type="button" @click="updateClick()" v-if="MemberId!=0" class="btn btn-secondary">
                    Update
                </button>

            </div>

        </div>
    </div>
</div>



</div>`,

    data() {
        return {
            compliance: [],
            members: [],
            modalTitle: '',
            MemberFullName: '',
            MemberFullNameFilter: '',
            membersWithoutFilter: [],
            Temperature: '',
            Date: '',
            Fever: '',
            Chills: '',
            Breath: '',
            Cough: '',
            Taste: '',
            Contact: '',
            Other: '',
            Department: '',
            DateOfBirth: '',
            DateOfBaptism: '',
            CellNumber: '',
            ResidentialAddress: '',
        };
    },
    methods: {
        refreshData() {
            axios.get(variables.API_URL + 'member').then((response) => {
                this.members = response.data;
                this.membersWithoutFilter = response.data;
            });

            axios.get(variables.API_URL + 'compliance').then((response) => {
                this.compliance = response.data;
            });
            axios.get(variables.API_URL + 'department').then((response) => {
                this.departments = response.data;
            });
        },
        addClick() {
            this.modalTitle = 'Add Member';
            this.MemberId = 0;
            this.MemberFullName = '';
            (this.Department = ''),
            (this.DateOfBirth = ''),
            (this.DateOfBaptism = ''),
            (this.CellNumber = ''),
            (this.ResidentialAddress = '');
        },
        editClick(mem) {
            this.modalTitle = 'Covid Compliance';
            this.MemberFullName = mem.MemberFullName;
            (this.Temperature = mem.Temperature),
            (this.Date = mem.Date),
            (this.Fever = mem.Fever),
            (this.Chills = mem.Chills),
            (this.Breath = mem.Breath),
            (this.Cough = mem.Cough),
            (this.Taste = mem.Taste),
            (this.Contact = mem.Contact),
            (this.Other = mem.Other);
        },
        createClick() {
            axios
                .post(variables.API_URL + 'member', {
                    MemberFullName: this.MemberFullName,
                    Department: this.Department,
                    DateOfBirth: this.DateOfBirth,
                    DateOfBaptism: this.DateOfBaptism,
                    ResidentialAddress: this.ResidentialAddress,
                    CellNumber: this.CellNumber,
                })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        updateClick() {
            axios
                .put(variables.API_URL + 'compliance', {
                    // ComplianceId: this.ComplianceId,
                    MemberId: this.MemberId,
                    MemberFullName: this.MemberFullName,
                    Temperature: this.Temperature,
                    Date: this.Date,
                    Fever: this.Fever,
                    Chills: this.Chills,
                    Breath: this.Breath,
                    Cough: this.Cough,
                    Taste: this.Taste,
                    Contact: this.Contact,
                    Other: this.Other,
                })
                .then((response) => {
                    this.refreshData();
                    alert(response.data);
                });
        },
        deleteClick(id) {
            if (!confirm('Are you sure?')) {
                return;
            }
            axios.delete(variables.API_URL + 'member/' + id).then((response) => {
                this.refreshData();
                alert(response.data);
            });
        },
        FilterFn() {
            var MemberFullNameFilter = this.MemberFullNameFilter;

            this.members = this.membersWithoutFilter.filter(function(el) {
                return el.MemberFullName.toString()
                    .toLowerCase()
                    .includes(MemberFullNameFilter.toString().trim().toLowerCase());
            });
        },
        sortResult(prop, asc) {
            this.members = this.membersWithoutFilter.sort(function(a, b) {
                if (asc) {
                    return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
                } else {
                    return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
                }
            });
        },
    },

    mounted: function() {
        this.refreshData();
    },
};
const member = {
    template: `
<div>

<button type="button"
class="btn btn-secondary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Member
</button>

<table class="table table-striped">
<thead>
    <tr>
        <th>
            Member Id
        </th>
        <th>
            Member Name
        </th>
        <th>
            Department
        </th>
        <th>
           Cell Number
        </th>
        <th>
            Residential Address
        </th>
        <th>
            Date Of Birth
        </th>
        <th>
            Date Of Baptism
        </th>
        <th>
            Options
        </th>
    </tr>
</thead>
<tbody>
    <tr v-for="mem in members">
        <td>{{mem.MemberId}}</td>
        <td>{{mem.MemberFullName}}</td>
        <td>{{mem.Department}}</td>
        <td>{{mem.CellNumber}}</td>
        <td>{{mem.ResidentialAddress}}</td>
        <td>{{mem.DateOfBirth}}</td>
        <td>{{mem.DateOfBaptism}}</td>
        <td>
            <button type="button"
            class="btn btn-light mr-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click="editClick(mem)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
            <button type="button" @click="deleteClick(mem.MemberId)"
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
        <button type="button" @click="createClick()"
        v-if="MemberId==0" class="btn btn-secondary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="MemberId!=0" class="btn btn-secondary">
        Update
        </button>

    </div>

</div>
</div>
</div>


</div>


`,

    data() {
        return {
            departments: [],
            members: [],
            modalTitle: '',
            MemberId: 0,
            MemberFullName: '',
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
            this.modalTitle = 'Edit Member';
            this.MemberId = mem.MemberId;
            this.MemberFullName = mem.MemberFullName;
            (this.Department = mem.Department),
            (this.CellNumber = mem.CellNumber),
            (this.ResidentialAddress = mem.ResidentialAddress),
            (this.DateOfBirth = mem.DateOfBirth),
            (this.DateOfBaptism = mem.DateOfBaptism);
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
                .put(variables.API_URL + 'member', {
                    MemberId: this.MemberId,
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
        deleteClick(id) {
            if (!confirm('Are you sure?')) {
                return;
            }
            axios.delete(variables.API_URL + 'member/' + id).then((response) => {
                this.refreshData();
                alert(response.data);
            });
        },
    },
    mounted: function() {
        this.refreshData();
    },
};
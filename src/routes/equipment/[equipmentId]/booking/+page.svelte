<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData, PageData } from "./$types";
  
    export let data: PageData;
    export let form: ActionData;
    let checkedStudentIds: Set<number> = new Set([data.userStudentId]);
  
    let filteredStudents = new Array<(typeof data.students)[0]>();
    let searchName: string = "";
    let searchSection: string = "";
    let searchEmail: string = "";
    let descriptionText: string = "";
    let selectAll: boolean = false;
  
    const toggleCheck = (id: number, checkedSet: Set<number>) => {
      let newSet = new Set(checkedSet);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
  
      return newSet;
    };
  
    $: {
      filteredStudents = Object.values(data.students)
        .filter((student) => {
          return (
            `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.includes(
              searchName.toLowerCase()
            ) &&
            `${student.grade} - ${student.section.toLowerCase()}`.includes(
              searchSection.toLowerCase()
            ) &&
            student.email.toLowerCase().includes(searchEmail.toLowerCase())
          );
        })
        .sort((a, b) => {
          if (a.id === data.userStudentId) return -1;
          if (b.id === data.userStudentId) return 1;
  
          if (
            `${a.grade} ${a.section}`.toLowerCase() <
            `${b.grade} ${b.section}`.toLowerCase()
          )
            return -1;
          if (
            `${a.grade} ${a.section}`.toLowerCase() >
            `${b.grade} ${b.section}`.toLowerCase()
          )
            return 1;
  
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
  
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
  
          if (a.email < b.email) return -1;
          if (a.email > b.email) return 1;
  
          return 0;
        });
    }
  
    const checkWhetherSelectedAll = () => {
      selectAll = filteredStudents.every((student) =>
        checkedStudentIds.has(student.id)
      );
    };
  
    const toggleAll = () => {
      if (selectAll) {
        filteredStudents.forEach((student) => {
          if (student.id === data.userStudentId) return;
          checkedStudentIds.add(student.id);
        });
      } else {
        filteredStudents.forEach((student) => {
          if (student.id === data.userStudentId) return;
          checkedStudentIds.delete(student.id);
        });
      }
  
      checkedStudentIds = checkedStudentIds;
    };
  </script>
  
  <p>You are now roaming for: <b>{data.equipment.name}</b></p>
  
  {#if form?.error}
    <p>{form?.error}</p>
  {/if}
  <br />
  
  <form
    method="post"
    use:enhance={({ formData }) => {
      formData.append("studentIds", JSON.stringify([...checkedStudentIds]));
  
      return async ({ update }) => {
        await update();
      };
    }}
  >
    <p>1. Roam for who?</p>
  
    <div class="max-h-[250px] overflow-auto">
      <table>
        <thead>
          <tr class="sticky top-0 bg-white">
            <th class="text-left">
              <div>Select</div>
              <div>
                <input
                  type="checkbox"
                  bind:checked={selectAll}
                  on:change={toggleAll}
                />
              </div>
            </th>
            <th class="text-left">
              <div>Name</div>
              <div>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  class="font-normal text-left w-full"
                  bind:value={searchName}
                  on:input={checkWhetherSelectedAll}
                />
              </div>
            </th>
            <th class="text-left">
              <div>Email</div>
              <div>
                <input
                  type="text"
                  placeholder="Filter by email..."
                  class="font-normal text-left w-full"
                  bind:value={searchEmail}
                  on:input={checkWhetherSelectedAll}
                />
              </div>
            </th>
            <th class="text-left">
              <div>Section</div>
              <div>
                <input
                  type="text"
                  placeholder="Filter by section..."
                  class="font-normal text-left w-full"
                  bind:value={searchSection}
                  on:input={checkWhetherSelectedAll}
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {#each Object.values(filteredStudents) as student (student.id)}
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={checkedStudentIds.has(student.id)}
                  disabled={student.id === data.userStudentId}
                  on:change={() =>
                    (checkedStudentIds = toggleCheck(
                      student.id,
                      checkedStudentIds
                    ))}
                />
              </td>
              <td>{student.lastName}, {student.firstName}</td>
              <td>{student.email}</td>
              <td>{student.grade} - {student.section}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  
    <br />
  
    <p>2. Roam for what dates?</p>
    <label for="startDate">Start your borrowing here: </label>
    <input type="datetime-local" name="startDate" />
    <br />
    <label for="endDate">End your borrowing here: </label>
    <input type="datetime-local" name="endDate" />
    <br />
  
    <br />
  
    <p>3. Why do you need this equipment?</p>
    <p>
      <i
        class={descriptionText.length > 1500
          ? "text-red-600 font-bold"
          : "text-gray-400"}
      >
        {descriptionText.length}/1500 characters
      </i>
    </p>
    <textarea
      name="requestDescription"
      bind:value={descriptionText}
      contenteditable
    ></textarea> <br />
  
    <br />
  
    <p>3. Final Information</p>
    <b>
      You will roam this equipment for {checkedStudentIds.size} student{checkedStudentIds.size >
      1
        ? "s"
        : ""}:
    </b>
    <ul>
      {#each checkedStudentIds as studentId (studentId)}
        <li>
          {data.students[studentId].firstName}
          {data.students[studentId].lastName}
          <i>({data.students[studentId].email})</i>
        </li>
      {/each}
    </ul>
    <br />
    <b>To have a successful application, the Roam should be approved by:</b>
    <ul>
      {#each data.admins as admin (admin.id)}
        <li>{admin.firstName} {admin.lastName} <i>({admin.email})</i></li>
      {/each}
    </ul>
  
    <br />
  
    <button type="submit">Submit Roam</button>
  </form>
  
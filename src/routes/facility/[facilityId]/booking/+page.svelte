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

  let requestDates: Array<{ start: Date; end: Date; id: number }> = [];
  let datesError: string = "";

  let startDate: string = "";
  let endDate: string = "";

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
            searchName.toLowerCase(),
          ) &&
          `${student.grade} - ${student.section.toLowerCase()}`.includes(
            searchSection.toLowerCase(),
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
      checkedStudentIds.has(student.id),
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

  const datesAdd = () => {
    if (startDate === "" || endDate === "") {
      datesError = "Please fill in both fields.";
      return;
    }

    if (
      requestDates.find(
        (date) =>
          date.start === new Date(startDate) && date.end === new Date(endDate),
      )
    ) {
      datesError = "This date range is already added.";
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      datesError = "Start date must be before end date.";
      return;
    }

    if (new Date(startDate) <= new Date()) {
      datesError = "Start date must be in the future.";
      return;
    }

    const overlapping = data.facility.blockedDates.some((existingRange) => {
      const existingStart = new Date(existingRange.start).getTime();
      const existingEnd = new Date(existingRange.end).getTime();
      const start = new Date(startDate).getTime();
      const end = new Date(endDate).getTime();
      return end >= existingStart && start <= existingEnd;
    });

    if (overlapping) {
      datesError = "This date range overlaps with a blocked date range.";
      return;
    }

    requestDates = [
      ...requestDates,
      {
        start: new Date(startDate),
        end: new Date(endDate),
        id: requestDates.length,
      },
    ];

    console.log(requestDates);
  };

  const datesRemove = (id: number) => {
    requestDates = requestDates.filter((date) => date.id !== id);
  };
</script>

<p>
  You are now roaming for: <b>{data.facility.name}</b>
</p>

{#if form?.error}
  <p>{form?.error}</p>
{/if}
<br />

<form
  method="post"
  use:enhance={({ formData }) => {
    formData.append("studentIds", JSON.stringify([...checkedStudentIds]));
    formData.append("requestDates", JSON.stringify(requestDates));

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
                class="w-full text-left font-normal"
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
                class="w-full text-left font-normal"
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
                class="w-full text-left font-normal"
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
                    checkedStudentIds,
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
  <p>Note that these dates are not available:</p>
  <ul>
    {#each data.facility.blockedDates as date}
      <li>
        {new Date(date.start).toLocaleString()} to {new Date(
          date.end,
        ).toLocaleString()}
      </li>
    {/each}
  </ul>
  <br />

  <table>
    <thead></thead>
    <tbody>
      {#each requestDates as requestDateRange (requestDateRange.id)}
        <tr>
          <td>
            {new Date(requestDateRange.start).toLocaleString()} to {new Date(
              requestDateRange.end,
            ).toLocaleString()}
          </td>
          <td>
            <button
              type="button"
              on:click={() => {
                datesRemove(requestDateRange.id);
              }}
            >
              Remove
            </button>
          </td>
          <td></td>
        </tr>
      {/each}
      <tr>
        <td>
          <input
            type="datetime-local"
            bind:value={startDate}
            on:change={() => {
              datesError = "";
            }}
          />
          (start) to
          <input
            type="datetime-local"
            bind:value={endDate}
            on:change={() => {
              datesError = "";
            }}
          />
          (end)
        </td>

        <td><button type="button" on:click={datesAdd}>Add</button></td>
        <td>{datesError}</td>
      </tr>
    </tbody>
  </table>
  <br />

  <br />

  <p>3. Why do you need this facility?</p>
  <p>
    <i
      class={descriptionText.length > 1500
        ? "font-bold text-red-600"
        : "text-gray-400"}
    >
      {descriptionText.length}/1500 characters
    </i>
  </p>
  <textarea
    name="requestDescription"
    bind:value={descriptionText}
    contenteditable
  ></textarea>
  <br />

  <br />

  <p>3. Final Information</p>
  <b>
    You will roam this facility for {checkedStudentIds.size} student{checkedStudentIds.size >
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
      <li>
        {admin.firstName}
        {admin.lastName}
        <i>({admin.email})</i>
      </li>
    {/each}
  </ul>

  <br />

  <button type="submit">Submit Roam</button>
</form>

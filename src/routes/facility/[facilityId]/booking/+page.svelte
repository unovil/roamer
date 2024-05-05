<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData, PageData } from "./$types";
  import { Button, Table } from "flowbite-svelte";

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

<svelte:head>
  <title>Roamer | Facility | {data.facility.name} (Booking)</title>
</svelte:head>

<div class="mx-auto flex max-w-screen-lg flex-col">
  <div
    class="sticky bottom-10 top-20 z-10 flex flex-col items-start bg-white dark:bg-black"
  >
    <p class="mb-3 mt-6 text-4xl font-bold text-log-in-green">Roaming for:</p>
    <div
      class="sticky bottom-10 top-20 z-10 flex flex-row items-center bg-white dark:bg-black"
    >
      <img
        class="mr-5 h-24 w-24 rounded-lg"
        src={`/${data.facility.image}`}
        alt=""
      />
      <div>
        <p class="text-3xl"><b>{data.facility.name}</b></p>
      </div>
    </div>
  </div>
  {#if form?.error}
    <p class="font-semibold text-red-600">{form?.error}</p>
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
    <Table class="h-full">
      <caption
        class="p-5 text-left text-3xl font-bold text-gray-900 dark:text-white"
      >
        1. Roam for who?
      </caption>

      <div class="max-h-[300px] overflow-auto">
        <table>
          <thead>
            <tr class="sticky top-0 bg-white">
              <th class="text-center">
                <div class="mr-1 text-lg text-black">Select</div>
                <div class="ml-0">
                  <input
                    type="checkbox"
                    class="ml-4 text-green-500"
                    bind:checked={selectAll}
                    on:change={toggleAll}
                  />
                </div>
              </th>
              <th class="text-center">
                <div class="text-lg text-black">Name</div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    class="w-full rounded-md text-left font-normal"
                    bind:value={searchName}
                    on:input={checkWhetherSelectedAll}
                  />
                </div>
              </th>
              <th class="text-center">
                <div class="text-lg text-black">Email</div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter by email..."
                    class="w-full rounded-md text-left font-normal"
                    bind:value={searchEmail}
                    on:input={checkWhetherSelectedAll}
                  />
                </div>
              </th>
              <th class="text-center">
                <div class="text-lg text-black">Section</div>
                <div>
                  <input
                    type="text"
                    placeholder="Filter by section..."
                    class="w-full rounded-md text-left font-normal"
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
                    class="ml-4 text-green-500"
                    checked={checkedStudentIds.has(student.id)}
                    disabled={student.id === data.userStudentId}
                    on:change={() =>
                      (checkedStudentIds = toggleCheck(
                        student.id,
                        checkedStudentIds,
                      ))}
                  />
                </td>
                <td class="text-base text-black">
                  {student.lastName}, {student.firstName}
                </td>
                <td class="text-base text-black">{student.email}</td>
                <td class="text-base text-black">
                  {student.grade} - {student.section}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Table>
    <br />

    <p class="p-5 text-left text-3xl font-bold text-gray-900 dark:text-white">
      2. Roam for what dates?
    </p>
    <div class="justify-center">
      <p class="flex text-lg font-bold">BLOCKED DATES:</p>
      <ul>
        {#each data.facility.blockedDates as date}
          <li class="font-medium">
            {new Date(date.start).toLocaleString()} - {new Date(
              date.end,
            ).toLocaleString()}
          </li>
        {/each}
      </ul>
    </div>
    <br />

    <table>
      <thead class="flex text-lg font-bold">
        REQUESTING FOR THE FOLLOWING:
      </thead>
      <tbody>
        {#each requestDates as requestDateRange (requestDateRange.id)}
          <tr>
            <td class="mb-4 mt-4 font-semibold">
              {new Date(requestDateRange.start).toLocaleString()} to {new Date(
                requestDateRange.end,
              ).toLocaleString()}
            </td>
            <td>
              <Button
                color="red"
                class="mr-2"
                pill
                on:click={() => {
                  datesRemove(requestDateRange.id);
                }}
              >
                Remove
              </Button>
            </td>
            <td></td>
          </tr>
        {/each}
        <tr>
          <td>
            <input
              type="datetime-local"
              class="rounded-md"
              bind:value={startDate}
              on:change={() => {
                datesError = "";
              }}
            />
            to
            <input
              type="datetime-local"
              class="rounded-md"
              bind:value={endDate}
              on:change={() => {
                datesError = "";
              }}
            />
          </td>

          <td>
            <Button color="green" class="ml-2 mr-2" pill on:click={datesAdd}>
              Add
            </Button>
          </td>
          <td class="font-semibold text-red-600">{datesError}</td>
        </tr>
      </tbody>
    </table>
    <br />

    <br />

    <p class="p-5 text-left text-3xl font-bold text-gray-900 dark:text-white">
      3. Describe the roam
    </p>
    <p>
      <i
        class={descriptionText.length > 1500
          ? "font-bold text-red-600"
          : "text-gray-400"}
      >
        <p class="flex justify-end">{descriptionText.length}/1500 characters</p>
      </i>
    </p>
    <textarea
      name="requestDescription"
      class="h-80 w-full"
      bind:value={descriptionText}
      contenteditable
    ></textarea>
    <br />

    <br />

    <p class="p-5 text-left text-3xl font-bold text-gray-900 dark:text-white">
      4. Final Information
    </p>
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

    <Button color="green" pill type="submit" size="lg">Submit Roam</Button>
  </form>
</div>

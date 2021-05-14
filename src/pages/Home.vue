<template>
  <Header />
  <div class="flex flex-wrap py-6">
    <div class="w-1/2 px-3"><Tree :json="convertedData" /></div>
    <div class="w-1/2 px-3"><Tree :json="convertedData" /></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Tree from "../components/Tree.vue";
import Header from "../components/Header.vue";
// import formatTree from "../utilities/primevue.ts"

export default defineComponent({
  components: { Tree, Header },
  setup() {
    const primevue_data = ref({
      root: [
        {
          key: "0",
          label: "Documents",
          data: "Documents Folder",
          icon: "pi pi-fw pi-inbox",
          children: [
            {
              key: "0-0",
              label: "Work",
              data: "Work Folder",
              icon: "pi pi-fw pi-cog",
              children: [
                {
                  key: "0-0-0",
                  label: "Expenses.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Expenses Document",
                },
                {
                  key: "0-0-1",
                  label: "Resume.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Resume Document",
                },
              ],
            },
            {
              key: "0-1",
              label: "Home",
              data: "Home Folder",
              icon: "pi pi-fw pi-home",
              children: [
                {
                  key: "0-1-0",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
              ],
            },
          ],
        },
        {
          key: "1",
          label: "Events",
          data: "Events Folder",
          icon: "pi pi-fw pi-calendar",
          children: [
            {
              key: "1-0",
              label: "Meeting",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Meeting",
            },
            {
              key: "1-1",
              label: "Product Launch",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Product Launch",
            },
            {
              key: "1-2",
              label: "Report Review",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Report Review",
            },
          ],
        },
        {
          key: "2",
          label: "Movies",
          data: "Movies Folder",
          icon: "pi pi-fw pi-star",
          children: [
            {
              key: "2-0",
              icon: "pi pi-fw pi-star",
              label: "Al Pacino",
              data: "Pacino Movies",
              children: [
                {
                  key: "2-0-0",
                  label: "Scarface",
                  icon: "pi pi-fw pi-video",
                  data: "Scarface Movie",
                },
                {
                  key: "2-0-1",
                  label: "Serpico",
                  icon: "pi pi-fw pi-video",
                  data: "Serpico Movie",
                },
              ],
            },
            {
              key: "2-1",
              label: "Robert De Niro",
              icon: "pi pi-fw pi-star",
              data: "De Niro Movies",
              children: [
                {
                  key: "2-1-0",
                  label: "Goodfellas",
                  icon: "pi pi-fw pi-video",
                  data: "Goodfellas Movie",
                },
                {
                  key: "2-1-1",
                  label: "Untouchables",
                  icon: "pi pi-fw pi-video",
                  data: "Untouchables Movie",
                },
              ],
            },
          ],
        },
      ],
    });
    const test = ref({
      root: [
        {
          key: "0",
          label: "Documents",
          children: [
            {
              key: "0-0",
              label: "Work",
              data: "Work Folder",
              icon: "pi pi-fw pi-cog",
              children: [
                {
                  key: "0-0-0",
                  label: "Expenses.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Expenses Document",
                },
                {
                  key: "0-0-1",
                  label: "Resume.doc",
                  icon: "pi pi-fw pi-file",
                  data: "Resume Document",
                  genome_uuid: "dd6cfb980c8a3659acffa4f002eac4da",
                },
              ],
            },
            {
              key: "0-1",
              label: "Home",
              data: "Home Folder",
              icon: "pi pi-fw pi-home",
              children: [
                {
                  key: "0-1-0",
                  label: "Invoices.txt",
                  icon: "pi pi-fw pi-file",
                  data: "Invoices for this month",
                },
              ],
            },
          ],
        },
        {
          key: "1",
          label: "Events",
          data: "Events Folder",
          icon: "pi pi-fw pi-calendar",
          children: [
            {
              key: "1-0",
              label: "Meeting",
              icon: "pi pi-fw pi-calendar-plus",
              data: "Meeting",
            },
          ],
        },
      ],
    });
    const convertedData = ref({
      root: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      children: [
                        {
                          children: [
                            {
                              children: [
                                {
                                  children: [
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002eac4da",
                                      key: "0-0-0-0-0-0-0-0",
                                      label: "Rothia aeria",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002c343c3",
                                      key: "0-0-0-0-0-0-0-1",
                                      label: "Rothia mucilaginosa DY-18",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002ae1ba7",
                                      key: "0-0-0-0-0-0-0-2",
                                      label: "Rothia dentocariosa ATCC 17931",
                                    },
                                  ],
                                  key: "0-0-0-0-0-0-0",
                                  label: "Rothia",
                                },
                                {
                                  children: [
                                    {
                                      genome_uuid:
                                        "55a07ba5d424074a686fdc6a023660b9",
                                      key: "0-0-0-0-0-0-1-0",
                                      label: "Glutamicibacter halophytocola",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002bfa518",
                                      key: "0-0-0-0-0-0-1-1",
                                      label: "Glutamicibacter nicotianae",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002e8e330",
                                      key: "0-0-0-0-0-0-1-2",
                                      label: "Glutamicibacter creatinolyticus",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002f6b392",
                                      key: "0-0-0-0-0-0-1-3",
                                      label:
                                        "Glutamicibacter arilaitensis Re117",
                                    },
                                  ],
                                  key: "0-0-0-0-0-0-1",
                                  label: "Glutamicibacter",
                                },
                                {
                                  children: [
                                    {
                                      genome_uuid:
                                        "55a07ba5d424074a686fdc6a02124d03",
                                      key: "0-0-0-0-0-0-2-0",
                                      label: "Arthrobacter alpinus",
                                    },
                                    {
                                      genome_uuid:
                                        "dd6cfb980c8a3659acffa4f002bf8c93",
                                      key: "0-0-0-0-0-0-2-1",
                                      label: "Arthrobacter crystallopoietes",
                                    },
                                    {
                                      genome_uuid:
                                        "55a07ba5d424074a686fdc6a023caa55",
                                      key: "0-0-0-0-0-0-2-2",
                                      label: "Arthrobacter dokdonellae",
                                    },
                                  ],
                                  key: "0-0-0-0-0-0-2",
                                  label: "Arthrobacter",
                                },
                              ],
                              key: "0-0-0-0-0-0",
                              label: "Micrococcaceae",
                            },
                          ],
                          key: "0-0-0-0-0",
                          label: "Micrococcales",
                        },
                      ],
                      key: "0-0-0-0",
                      label: "Actinobacteria",
                    },
                  ],
                  key: "0-0-0",
                  label: "Actinobacteria",
                },
              ],
              key: "0-0",
              label: "Terrabacteria group",
            },
          ],
          key: "0",
          label: "Bacteria",
        },
      ],
    });
    // comment exécuter formatTree ici?
    return { primevue_data, test, convertedData };
  },
});
</script>
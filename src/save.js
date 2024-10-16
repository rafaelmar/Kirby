// import { readTextFile, writeTextFile, BaseDirectory } from '@tauri-apps/api/path';


// function save(saveFileName) {
//     return {
//         data: {
//             async save() {
//                 await writeTextFile(saveFileName, JSON.stringify(this.data), { dir: BaseDirectory.AppLocalData })
//             },
//             async load() {
//                 try {
//                     this.data = JSON.parse(
//                         await readTextFile(savefileName, { dir: BaseDirectory.AppLocalData })
//                     )
//                 } catch {
//                     this.data = {}
//                 }
//             }
//         }
//     }
// }

// export const saveFile = save("save.json")
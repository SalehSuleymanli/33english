import os,re
d='src/content/lessons'
files=sorted(f for f in os.listdir(d) if re.match(r'day\d\d\.ts$',f))
imp="\n".join(f'import {f[:-3]} from "./{f[:-3]}";' for f in files)
lst=", ".join(f[:-3] for f in files)
open(f'{d}/registry.ts','w').write(f'''import type {{ Lesson }} from "../types";
{imp}

/** All authored lessons, in order. */
export const LESSON_LIST: Lesson[] = [{lst}];
''')
print(len(files))

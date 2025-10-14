#!/usr/bin/env sh
# Copyright '"$YEAR_RANGE"' '"$AUTHOR"'
# SPDX-License-Identifier: Apache-2.0
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at:
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

set -e

BASE_YEAR=2025
CURRENT_YEAR=$(date +%Y)
AUTHOR="Davide Di Criscito"

# Compute year range
if [ "$CURRENT_YEAR" -gt "$BASE_YEAR" ]; then
    YEAR_RANGE="${BASE_YEAR}-${CURRENT_YEAR}"
else
    YEAR_RANGE="$BASE_YEAR"
fi

# --- Full license header for this script ---
LICENSE_HEADER='/**
 * Copyright '"$YEAR_RANGE"' '"$AUTHOR"'
 * SPDX-License-Identifier: Apache-2.0
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */'

# --- Update the script's own license header ---
SCRIPT_FILE="$0"
TMP_SCRIPT=$(mktemp)
printf '%s\n' "$LICENSE_HEADER" > "$TMP_SCRIPT"
# Skip old header (assume first 16 lines approx.)
tail -n +17 "$SCRIPT_FILE" >> "$TMP_SCRIPT"
mv "$TMP_SCRIPT" "$SCRIPT_FILE"

# --- Header for .ts files ---
TS_HEADER='/**
 * Copyright '"$YEAR_RANGE"' '"$AUTHOR"'
 * SPDX-License-Identifier: Apache-2.0
 */'

MODIFIED=0

# --- Process all .ts files under any src folder ---
while IFS= read -r f; do
    if [ ! -f "$f" ]; then
        continue
    fi

    if ! grep -q "SPDX-License-Identifier: Apache-2.0" "$f"; then
        printf 'Adding header to %s\n' "$f"
        TMP=$(mktemp)
        printf '%s\n' "$TS_HEADER" > "$TMP"
        cat "$f" >> "$TMP"
        mv "$TMP" "$f"
        MODIFIED=1
    else
        # Update year range if needed
        sed -i "s/Copyright .\{4,9\} ${AUTHOR}/Copyright ${YEAR_RANGE} ${AUTHOR}/" "$f"
    fi
done <<EOF
$(find . -type f -path "*/src/*.ts")
EOF

# --- Output result ---
if [ "$MODIFIED" -eq 1 ]; then
    printf 'headers-added=true\n'
else
    printf 'headers-added=false\n'
fi

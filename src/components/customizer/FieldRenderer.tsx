export function FieldRenderer({
  fieldKey,
  schemaValue,
  value,
  onChange,
}:any) {
  const label = fieldKey
    .replace(/([A-Z])/g, " $1")
    .toUpperCase();

  // 🟢 STRING FIELD
  if (schemaValue === "string") {
    return (
      <div className="mb-3">
        <label className="text-xs">{label}</label>
        <input
          className="w-full border rounded px-2 py-1"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }

  // 🟡 NUMBER FIELD
  if (schemaValue === "number") {
    return (
      <div className="mb-3">
        <label className="text-xs">{label}</label>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={value || ""}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    );
  }

  // 🔵 BOOLEAN FIELD
  if (schemaValue === "boolean") {
    return (
      <div className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(e.target.checked)}
        />
        <label className="text-xs">{label}</label>
      </div>
    );
  }

  // 🟣 ARRAY FIELD
  if (Array.isArray(schemaValue)) {
    const itemSchema = schemaValue[0];
 // ✅ ARRAY OF PRIMITIVES (string, number, boolean)
  if (typeof itemSchema === "string") {
    return (
      <div className="mb-4">
        <p className="text-xs font-semibold mb-2">{label}</p>

        {(value || []).map((item: any, index: number) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              className="w-full border rounded px-2 py-1"
              value={item || ""}
              onChange={(e) => {
                const newArr = [...value];
                newArr[index] =
                  itemSchema === "number"
                    ? Number(e.target.value)
                    : itemSchema === "boolean"
                    ? e.target.checked
                    : e.target.value;

                onChange(newArr);
              }}
            />

            <button
              onClick={() => {
                const newArr = value.filter(
                  (_: any, i: number) => i !== index
                );
                onChange(newArr);
              }}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            const defaultValue =
              itemSchema === "number"
                ? 0
                : itemSchema === "boolean"
                ? false
                : "";

            onChange([...(value || []), defaultValue]);
          }}
          className="text-blue-500 text-xs"
        >
          + Add Item
        </button>
      </div>
    );
  }
    return (
      <div className="mb-4">
        <p className="text-xs font-semibold mb-2">{label}</p>

        {(value || []).map((item:any, index:number) => (
          <div
            key={index}
            className="border p-2 rounded mb-2 space-y-2"
          >
            {Object.keys(itemSchema).map((k) => (
              <FieldRenderer
                key={k}
                fieldKey={k}
                schemaValue={itemSchema[k]}
                value={item?.[k]}
                onChange={(val:any) => {
                  const newArr = [...value];
                  newArr[index] = {
                    ...newArr[index],
                    [k]: val,
                  };
                  onChange(newArr);
                }}
              />
            ))}

            <button
              onClick={() => {
                const newArr = value.filter(
                  (_:any, i:number) => i !== index
                );
                onChange(newArr);
              }}
              className="text-red-500 text-xs"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            const emptyItem = Object.fromEntries(
              Object.keys(itemSchema).map((k) => [k, ""])
            );
            onChange([...(value || []), emptyItem]);
          }}
          className="text-blue-500 text-xs"
        >
          + Add Item
        </button>
      </div>
    );
  }

  // 🟠 OBJECT FIELD
  if (typeof schemaValue === "object") {
    return (
      <div className="mb-4 border p-2 rounded">
        <p className="text-xs font-semibold mb-2">{label}</p>

        {Object.keys(schemaValue).map((k) => (
          <FieldRenderer
            key={k}
            fieldKey={k}
            schemaValue={schemaValue[k]}
            value={value?.[k]}
            onChange={(val:any) =>
              onChange({
                ...value,
                [k]: val,
              })
            }
          />
        ))}
      </div>
    );
  }

  return null;
}
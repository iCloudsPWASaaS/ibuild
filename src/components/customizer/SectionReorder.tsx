import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import { GripVertical, Eye, EyeOff, Lock, Pencil } from "lucide-react";
// ==========================
// SINGLE DRAG ITEM
// ==========================
function SortableItem({ section, onSelect, onToggle, activeSection, handleEditModal }: any) {
  const isLocked = section?.type === "header" || section?.type == "footer";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id, disabled: isLocked });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const isActive = activeSection === section?.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(section.id)}
      className={`relative flex items-center justify-between p-3 mb-2 rounded border cursor-pointer border
        ${section.visible ? "bg-white" : "bg-gray-100 dark:bg-gray-800 opacity-60"}
        hover:shadow  ${isActive ? "border-blue-700" : "hover:border-gray-50"}`}
    >
      {/* LEFT SIDE */}
      <div className="flex items-center gap-2">

        {/* 🔥 DRAG ICON */}
        {isLocked ? (
          <Lock size={16} className="text-gray-400" />
        ) : (
          <span
            {...listeners}
            {...attributes}
            onClick={(e) => e.stopPropagation()}
            className="cursor-grab text-gray-400 hover:text-black"
          >
            <GripVertical size={18} />
          </span>
        )}


        {/* SECTION NAME */}
        <span className="text-black text-sm font-medium capitalize">
          {section.type}
        </span>
      </div>
      {/* RIGHT SIDE */}
      {!isLocked && <div className="flex items-center gap-2"><button
        onClick={(e) => {
          e.stopPropagation();
          handleEditModal(section.id);
        }}
        className={`text-gray-500 hover:text-black group ${!section.visible && "cursor-not-allowed"}`}
        disabled={!section.visible}
      >
        <Pencil size={14} />
      </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(section.id);
          }}
          className="text-gray-500 hover:text-black"
        >
          {section.visible ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
      }
    </div>
  );
}



// ==========================
// MAIN DRAG LIST
// ==========================
export default function SectionReorder({
  sections,
  setSections,
  onSectionSelect,
  toggleSectionVisibility,
  activeSection,
  handleEditModal
}: any) {
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex(
      (sec: any) => sec.id === active.id
    );

    const newIndex = sections.findIndex(
      (sec: any) => sec.id === over.id
    );

    const newData = arrayMove(sections, oldIndex, newIndex);

    setSections(newData); // 🔥 update state (autosave trigger)
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((s: any) => s.id)}
        strategy={verticalListSortingStrategy}
      >
        {sections.map((section: any) => (
          <SortableItem key={section.id} activeSection={activeSection} handleEditModal={handleEditModal} onToggle={toggleSectionVisibility} onSelect={onSectionSelect} section={section} />
        ))}
      </SortableContext>
    </DndContext>
  );
}
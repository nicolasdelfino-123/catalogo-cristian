export default function AdminBudgetToolbar({
    isActive = false,
    selectedCount = 0,
    budgetFilter = "all",
    onBudgetFilterChange = () => { },
    onStart = () => { },
    onConfirm = () => { },
    onCancel = () => { },
}) {
    return (
        <>
            {isActive && (
                <label className="flex w-full min-h-[42px] cursor-pointer items-center justify-between gap-3 rounded border border-stone-300 bg-white px-3 py-2 text-sm text-stone-700 sm:w-auto sm:min-w-0 sm:justify-start sm:gap-2 sm:px-2.5 sm:text-[13px]">
                    <span className="font-medium sm:whitespace-nowrap">Ver presupuesto seleccionado</span>
                    <input
                        type="checkbox"
                        checked={budgetFilter === "selected"}
                        onChange={(e) => onBudgetFilterChange(e.target.checked ? "selected" : "all")}
                        className="h-5 w-5 rounded border-2 border-stone-900 accent-slate-900"
                    />
                </label>
            )}

            <div className={`flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-end ${isActive ? "" : "sm:ml-auto"}`}>
                {isActive && (
                    <button
                    type="button"
                    onClick={onCancel}
                        className="w-full px-4 py-2 rounded border border-stone-300 text-stone-700 hover:bg-stone-50 sm:w-auto sm:px-3"
                    >
                        Cancelar
                    </button>
                )}

                <button
                    type="button"
                    onClick={isActive ? onConfirm : onStart}
                    disabled={isActive && selectedCount === 0}
                    className={`w-full px-4 py-2 rounded text-white transition-colors text-center leading-snug sm:w-auto sm:px-3 sm:whitespace-nowrap ${isActive
                        ? "bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300"
                        : "bg-slate-800 hover:bg-slate-900"
                        }`}
                >
                    {isActive ? `Confirmar presupuesto${selectedCount > 0 ? ` (${selectedCount})` : ""}` : "Presupuesto"}
                </button>
            </div>
        </>
    );
}

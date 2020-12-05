
class _Logger {
    debug(...data: any[]): void {
        console.log("[DEBUG]", ...data);
    }
}

export const Logger = new _Logger();

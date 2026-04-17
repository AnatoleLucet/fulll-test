export class PlateNumber {
  constructor(public readonly value: string) {
    if (!value || value.trim() === "") {
      throw new Error("Plate number cannot be empty");
    }
  }

  equals(other: PlateNumber): boolean {
    return this.value === other.value;
  }
}

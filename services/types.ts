
export interface DataTypes {
  name: string,
  stateName: string,
  availability: {
    from: string,
    to: string
  },
  clinicName: string,
  stateCode: string,
  opening: {
    from: string,
    to: string
  }
}
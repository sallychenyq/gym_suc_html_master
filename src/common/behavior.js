export const appointmentCardBehavior = {
    methods: {
        cancelAppointment() {
            this.$emit('cancel',this.item.id);
        }
    }
};

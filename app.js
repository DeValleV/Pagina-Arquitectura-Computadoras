/**
 * Función para expandir/contraer una unidad
 * @param {string} unitId - ID de la unidad a expandir/contraer
 * @param {Event} event - Evento de clic
 */
function toggleUnit(unitId, event) {
	const unitContent = document.getElementById(unitId);
	const unitButton = event.target.closest('.unit-button');
	
	// Cerrar todas las demás unidades
	document.querySelectorAll('.unit-content.active').forEach(content => {
		if (content.id !== unitId) {
			content.classList.remove('active');
			content.parentElement.querySelector('.unit-button').classList.remove('active');
		}
	});
	
	// Toggle la unidad actual
	unitContent.classList.toggle('active');
	unitButton.classList.toggle('active');
	
	// Cerrar todos los subtemas de otras unidades
	document.querySelectorAll('.subtopic-content.active').forEach(content => {
		if (!content.closest('#' + unitId)) {
			content.classList.remove('active');
		}
	});
}

/**
 * Función para mostrar el contenido de un subtema
 * @param {string} subtopicId - ID del subtema a mostrar
 */
function showContent(subtopicId) {
	const subtopicContent = document.getElementById(subtopicId);
	
	// Obtener todos los subtemas de la unidad padre
	const unitContent = subtopicContent.closest('.unit-content');
	const allSubtopics = unitContent.querySelectorAll('.subtopic-content');
	
	// Cerrar todos los subtemas excepto el seleccionado
	allSubtopics.forEach(subtopic => {
		if (subtopic.id !== subtopicId) {
			subtopic.classList.remove('active');
		}
	});
	
	// Alternar el subtema seleccionado
	subtopicContent.classList.toggle('active');
	
	// Scroll suave al contenido
	subtopicContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
	document.querySelectorAll('.unit-button').forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			const unitId = button.getAttribute('data-unit-id');
			if (unitId) {
				toggleUnit(unitId, e);
			}
		});
	});
	});
	
	// Expandir la primera unidad por defecto
	const firstUnit = document.querySelector('.unit-content');
	if (firstUnit) {
		firstUnit.classList.add('active');
		firstUnit.parentElement.querySelector('.unit-button').classList.add('active');
	}
});

module.exports = {
    getannotations: function (target) {
        annotations = target.__decorators__()
        var class_annotations = []
        var method_annotations = []
        var property_annotations = []
        for (annotation of annotations) {
            const json_annotation = JSON.parse(annotation)
            if (json_annotation.type == "class") {
                class_annotations.push(json_annotation)
            } else if (json_annotation.type == "method") {
                method_annotations.push(json_annotation)
            } else if (json_annotation.type == "property") {
                property_annotations.push(json_annotation)
            }
        }
        return {class: class_annotations, method: method_annotations, property: property_annotations}
    }
}
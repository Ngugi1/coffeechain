async function periodic_updates(proxy) {
  // Wait for timeout to elapse and save the object again
  setTimeout(() => { console.log("Timeout elapsed"); proxy.save(); periodic_updates(proxy) }, 10000)
}
module.exports = {
    register_periodic_updates: function (target, proxy, annotations) {
        for (annotation of annotations) {
            if (annotation.key) {
                if (annotation.key.toLowerCase() == "timeout") {
                    periodic_updates(proxy)
                } else if (annotation.key.toLowerCase() == "writes") {
                    if (Reflect.has(target, "__update_count__") == false) {
                        Reflect.defineProperty(target, "__update_count__", {value: {count: 0, threshold: annotation.value}, writable: true})
                    }
                }
            }
            
        }

    },

    update_write_count(target, proxy) {
        // Update the write count
        target.__update_count__.count += 1
        if (target.__update_count__.count > target.__update_count__.threshold) {
            console.log("Update count exceeded!!!")
            target.__update_count__.count = 0
            proxy.save()
        }
    }
}